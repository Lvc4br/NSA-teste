import test from "node:test";
import assert from "node:assert/strict";
import {
  student,
  teacher,
  teacherClasses,
  attendance,
  grades,
  schedule,
  subjects,
} from "../src/services/mock/mockData.js";

test("student and teacher fixtures are clearly separate demo profiles", () => {
  assert.equal(student.course, "Desenvolvimento de Sistemas");
  assert.equal(teacher.role, "Professor");
  assert.match(teacher.school, /demonstrativos/i);
});

test("attendance percentages stay in the valid range", () => {
  assert.ok(attendance.percentage >= 0 && attendance.percentage <= 100);
  for (const subject of subjects) {
    assert.ok(subject.attendance >= 0 && subject.attendance <= 100);
  }
});

test("grade and schedule fixtures contain the fields used by the UI", () => {
  assert.ok(grades.length > 0);
  for (const grade of grades) {
    assert.ok(grade.subject);
    assert.ok(grade.teacher);
    assert.ok(grade.grade);
    assert.ok(grade.progress >= 0 && grade.progress <= 100);
  }

  assert.ok(schedule.length > 0);
  for (const slot of schedule) {
    assert.ok(slot.day);
    assert.ok(slot.time);
    assert.ok(slot.subject);
    assert.ok(slot.room);
  }
});

test("teacher class fixtures have stable IDs and statuses", () => {
  assert.ok(teacherClasses.length > 0);
  assert.equal(new Set(teacherClasses.map((item) => item.id)).size, teacherClasses.length);
  for (const item of teacherClasses) {
    assert.ok(item.className);
    assert.ok(item.subject);
    assert.ok(item.attendance);
  }
});
