export class SecurityHelper {
  static generateToken(): string {
    return Math.random().toString(36).substr(2, 12);
  }
}