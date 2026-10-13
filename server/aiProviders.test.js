import assert from "node:assert/strict";
import test from "node:test";
import { generateWithFallback } from "./aiProviders.js";

const geminiModels = ["gemini-primary", "gemini-secondary"];

function createOptions(overrides = {}) {
  return {
    geminiModels,
    groqModel: "groq-model",
    hasGemini: true,
    hasGroq: true,
    log: () => {},
    ...overrides,
  };
}

test("uses Gemini first when it succeeds", async () => {
  const calls = [];
  const result = await generateWithFallback(createOptions({
    generateGemini: async ({ model }) => {
      calls.push(model);
      return "Gemini reply";
    },
    generateGroq: async () => "Groq reply",
  }));

  assert.deepEqual(calls, ["gemini-primary"]);
  assert.equal(result.provider, "Gemini");
  assert.equal(result.reply, "Gemini reply");
});

test("uses Groq after Gemini quota exhaustion without retrying Gemini models", async () => {
  const calls = [];
  const result = await generateWithFallback(createOptions({
    generateGemini: async ({ model }) => {
      calls.push(`Gemini:${model}`);
      const error = new Error("429 RESOURCE_EXHAUSTED");
      error.status = 429;
      throw error;
    },
    generateGroq: async ({ model }) => {
      calls.push(`Groq:${model}`);
      return "Groq reply";
    },
  }));

  assert.deepEqual(calls, ["Gemini:gemini-primary", "Groq:groq-model"]);
  assert.equal(result.provider, "Groq");
});

test("recognizes Gemini RESOURCE_EXHAUSTED status values", async () => {
  const calls = [];
  const result = await generateWithFallback(createOptions({
    generateGemini: async ({ model }) => {
      calls.push(`Gemini:${model}`);
      const error = new Error("quota exhausted");
      error.status = "RESOURCE_EXHAUSTED";
      throw error;
    },
    generateGroq: async () => {
      calls.push("Groq:groq-model");
      return "Groq reply";
    },
  }));

  assert.deepEqual(calls, ["Gemini:gemini-primary", "Groq:groq-model"]);
  assert.equal(result.provider, "Groq");
});

test("does not retry Gemini models after an authentication failure", async () => {
  const calls = [];
  const result = await generateWithFallback(createOptions({
    generateGemini: async ({ model }) => {
      calls.push(`Gemini:${model}`);
      const error = new Error("invalid API key");
      error.status = 401;
      throw error;
    },
    generateGroq: async () => {
      calls.push("Groq:groq-model");
      return "Groq reply";
    },
  }));

  assert.deepEqual(calls, ["Gemini:gemini-primary", "Groq:groq-model"]);
  assert.equal(result.provider, "Groq");
});

test("logs Groq HTTP status and sanitized SDK response message", async () => {
  const logs = [];
  const result = await generateWithFallback(createOptions({
    log: (message) => logs.push(message),
    generateGemini: async ({ model }) => {
      if (model === "gemini-primary") throw new Error("temporary failure");
      return "Gemini fallback reply";
    },
    generateGroq: async () => {
      const error = new Error("404 Not Found");
      error.status = 404;
      error.error = {
        error: {
          message: "The model was not found. Authorization: Bearer test-secret-value",
        },
      };
      throw error;
    },
  }));

  assert.equal(result.provider, "Gemini");
  assert.ok(logs[1].includes("provider=Groq model=groq-model status=404"));
  assert.ok(logs[1].includes("The model was not found."));
  assert.ok(logs[1].includes("Authorization: [REDACTED]"));
  assert.ok(!logs[1].includes("test-secret-value"));
});

test("tries remaining Gemini models after a non-quota Groq failure", async () => {
  const calls = [];
  const result = await generateWithFallback(createOptions({
    generateGemini: async ({ model }) => {
      calls.push(`Gemini:${model}`);
      if (model === "gemini-primary") throw new Error("temporary failure");
      return "Secondary Gemini reply";
    },
    generateGroq: async () => {
      calls.push("Groq:groq-model");
      throw new Error("temporary failure");
    },
  }));

  assert.deepEqual(calls, [
    "Gemini:gemini-primary",
    "Groq:groq-model",
    "Gemini:gemini-secondary",
  ]);
  assert.equal(result.provider, "Gemini");
});

test("works with only Groq configured", async () => {
  const result = await generateWithFallback(createOptions({
    hasGemini: false,
    generateGroq: async () => "Groq-only reply",
  }));

  assert.equal(result.provider, "Groq");
});

test("works with only Gemini configured", async () => {
  const result = await generateWithFallback(createOptions({
    hasGroq: false,
    generateGemini: async ({ model }) => `${model} reply`,
  }));

  assert.equal(result.provider, "Gemini");
  assert.equal(result.reply, "gemini-primary reply");
});

test("fails with a friendly unavailable code after all providers fail", async () => {
  await assert.rejects(
    generateWithFallback(createOptions({
      generateGemini: async () => { throw new Error("failure"); },
      generateGroq: async () => { throw new Error("failure"); },
    })),
    { code: "LUNA_UNAVAILABLE" }
  );
});

test("honors the total deadline without continuing provider attempts", async () => {
  const calls = [];
  const started = Date.now();

  await assert.rejects(
    generateWithFallback(createOptions({
      deadlineMs: 40,
      generateGemini: async () => {
        calls.push("Gemini");
        return new Promise(() => {});
      },
      generateGroq: async () => {
        calls.push("Groq");
        return "too late";
      },
    })),
    { code: "LUNA_TIMEOUT" }
  );

  assert.deepEqual(calls, ["Gemini"]);
  assert.ok(Date.now() - started < 250);
});

test("does not accept an empty provider response as a generated reply", async () => {
  await assert.rejects(
    generateWithFallback(createOptions({
      generateGemini: async () => " ",
      generateGroq: async () => "",
    })),
    { code: "LUNA_UNAVAILABLE" }
  );
});