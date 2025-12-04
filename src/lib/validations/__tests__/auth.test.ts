import { validateLogin, validateRegister } from '../auth';
import { loginSchema, registerSchema } from '@/configs/schemas/auth';
import { findUserByEmail, findUserByUsername } from '@/lib/firestore/users';

// Mock Firestore functions
jest.mock('@/lib/firestore/users', () => ({
  findUserByEmail: jest.fn(),
  findUserByUsername: jest.fn(),
}));

// Use runtime jest.mocked helper instead of TypeScript type assertions
const mockFindUserByEmail = jest.mocked(findUserByEmail);
const mockFindUserByUsername = jest.mocked(findUserByUsername);

describe('Auth Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateLogin', () => {
    it('should validate correct login data', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await validateLogin(loginData);
      expect(result).toEqual(loginData);
    });

    it('should reject invalid email format', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(validateLogin(invalidData)).rejects.toThrow();
    });

    it('should reject empty password', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: '',
      };

      await expect(validateLogin(invalidData)).rejects.toThrow();
    });
  });

  describe('validateRegister', () => {
    it('should validate correct registration data when user does not exist', async () => {
      mockFindUserByEmail.mockResolvedValue(null);
      mockFindUserByUsername.mockResolvedValue(null);

      const registerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = await validateRegister(registerData);
      expect(result).toEqual(registerData);
      expect(mockFindUserByEmail).toHaveBeenCalledWith(registerData.email);
      expect(mockFindUserByUsername).toHaveBeenCalledWith(registerData.username);
    });

    it('should reject registration when email already exists', async () => {
      mockFindUserByEmail.mockResolvedValue({
        id: 1,
        username: 'existinguser',
        email: 'test@example.com',
        role: 'USER',
      });
      mockFindUserByUsername.mockResolvedValue(null);

      const registerData = {
        username: 'newuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(validateRegister(registerData)).rejects.toThrow(
        'User with this email already exists',
      );
    });

    it('should reject registration when username already exists', async () => {
      mockFindUserByEmail.mockResolvedValue(null);
      mockFindUserByUsername.mockResolvedValue({
        id: 1,
        username: 'existinguser',
        email: 'other@example.com',
        role: 'USER',
      });

      const registerData = {
        username: 'existinguser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(validateRegister(registerData)).rejects.toThrow(
        'User with this username already exists',
      );
    });

    it('should reject registration when passwords do not match', async () => {
      const registerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
      };

      await expect(validateRegister(registerData)).rejects.toThrow();
    });

    it('should reject registration with invalid email format', async () => {
      const registerData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(validateRegister(registerData)).rejects.toThrow();
    });
  });
});
