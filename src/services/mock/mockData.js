export const student = {
  name: "Luca",
  course: "Desenvolvimento de Sistemas",
  module: "2º Módulo",
  className: "DS-2A",
};

export const teacher = {
  name: "Nilson Almeida",
  role: "Professor",
  subject: "Banco de Dados e Desenvolvimento de Sistemas",
  school: "ETEC (dados demonstrativos)",
};

export const teacherClasses = [
  { id: 1, time: "19:00", subject: "Banco de Dados", className: "DS-2A", room: "Laboratório 3", attendance: "Pendente" },
  { id: 2, time: "20:40", subject: "Banco de Dados", className: "DS-2B", room: "Laboratório 3", attendance: "Pendente" },
  { id: 3, time: "22:20", subject: "Projeto Integrador", className: "DS-3A", room: "Sala 8", attendance: "Agendada" },
];

export const attendance = {
  percentage: 92,
  absences: 7,
  totalClasses: 88,
};

export const nextClass = {
  subject: "Banco de Dados",
  teacher: "Professor Nilson",
  time: "19:00",
  room: "Laboratório 3",
};

export const grades = [
  { subject: "Banco de Dados", teacher: "Prof. Nilson", grade: "B", progress: 82 },
  { subject: "Programação", teacher: "Prof. Gerson", grade: "MB", progress: 94 },
  { subject: "Web", teacher: "Prof. João", grade: "B", progress: 86 },
  { subject: "Engenharia de Software", teacher: "Prof. Marina", grade: "B", progress: 80 },
];

export const schedule = [
  { day: "Segunda", time: "19:00", subject: "Banco de Dados", room: "Lab 3", teacher: "Prof. Nilson" },
  { day: "Terça", time: "19:00", subject: "Programação", room: "Lab 2", teacher: "Prof. Gerson" },
  { day: "Quarta", time: "19:00", subject: "Web", room: "Lab 1", teacher: "Prof. João" },
  { day: "Quinta", time: "19:00", subject: "Engenharia de Software", room: "Sala 8", teacher: "Prof. Marina" },
];

export const subjects = [
  { name: "Banco de Dados", teacher: "Prof. Nilson", attendance: 91, grade: "B" },
  { name: "Programação", teacher: "Prof. Gerson", attendance: 96, grade: "MB" },
  { name: "Web", teacher: "Prof. João", attendance: 94, grade: "B" },
  { name: "Engenharia de Software", teacher: "Prof. Marina", attendance: 88, grade: "B" },
];