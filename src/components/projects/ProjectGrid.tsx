import { useState } from "react";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "../../data/projects";

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    // If the project has a live website,
    // open it in a completely new browser tab.
    if (project.liveUrl) {
      window.open(
        project.liveUrl,
        "_blank",
        "noopener,noreferrer",
      );

      return;
    }

    // For projects without a live URL,
    // keep the existing modal behavior.
    setSelectedProject(project);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}