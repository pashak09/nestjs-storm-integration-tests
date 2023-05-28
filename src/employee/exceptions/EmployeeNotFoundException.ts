export class EmployeeNotFoundException extends Error {
  constructor(id: number) {
    super(`employee not found by ${id}`);
  }
}
