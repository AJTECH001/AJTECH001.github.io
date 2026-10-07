import test from "node:test";
import assert from "node:assert/strict";
import { projectRecords } from "../../apps/web/lib/project-content.ts";
import {
  isPublishedProject,
  getProjectSections,
  projectPeriod,
} from "../../apps/web/lib/project-records.ts";

const project = projectRecords[0];
test("publication and operational status are independent", () => {
  assert.equal(isPublishedProject(project), true);
  for (const status of ["Operational", "Research", "Archived"]) {
    assert.equal(
      isPublishedProject({
        ...project,
        status,
        publication: { state: "draft", visibility: "private" },
      }),
      false,
    );
    assert.equal(isPublishedProject({ ...project, status }), true);
  }
  assert.equal(
    isPublishedProject({
      ...project,
      publication: { state: "withdrawn", visibility: "private" },
    }),
    false,
  );
});
test("unknown periods remain absent", () => {
  assert.equal(projectPeriod({ ...project, year: undefined }), undefined);
  assert.equal(
    projectPeriod({ ...project, year: undefined, period: " " }),
    undefined,
  );
  assert.equal(
    projectPeriod({ ...project, period: "2026 — in development" }),
    "2026 — in development",
  );
});
test("empty optional sections do not become headings", () => {
  const empty = {
    ...project,
    sections: { hardware: { paragraphs: [" "] } },
    architecture: undefined,
    roadmap: [],
    debugging: [],
  };
  assert.deepEqual(getProjectSections(empty), []);
  const ids = getProjectSections(project).map((section) => section.id);
  assert.ok(ids.includes("debugging"));
  assert.ok(ids.includes("lessons"));
  assert.ok(ids.includes("current-state"));
  assert.ok(!ids.includes("hardware"));
  assert.ok(!ids.includes("operations"));
});
test("published IDs, numbers, and slugs are unique", () => {
  const published = projectRecords.filter(isPublishedProject);
  for (const key of ["id", "number", "slug"])
    assert.equal(
      new Set(published.map((item) => item[key])).size,
      published.length,
    );
});
