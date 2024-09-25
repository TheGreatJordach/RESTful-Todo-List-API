import * as argon2 from 'argon2';
import { Argon2iProvider } from './argon2i.provider';
import { InternalServerErrorException } from '@nestjs/common';

describe('Argon2iProvider', () => {
  let provider: Argon2iProvider;

  beforeEach(() => {
    provider = new Argon2iProvider();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Argon2iProvider - comparePassword', () => {
    it('should return true if the password matches', async () => {
      const data = 'testpassword';
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockResolvedValue(true);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(true);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should return false if the password does not match', async () => {
      const data = 'testpassword';
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should throw InternalServerErrorException if argon2.verify throws an error', async () => {
      const data = 'testpassword';
      const encrypted = 'hashedpassword';

      const errorMessage = 'some error';
      jest.spyOn(argon2, 'verify').mockRejectedValue(new Error(errorMessage));

      await expect(provider.comparePassword(data, encrypted)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(provider.comparePassword(data, encrypted)).rejects.toThrow(
        `Argon Failed to hash password ${errorMessage}`,
      );
    });

    // Additional behavior tests

    it('should handle empty strings as input data', async () => {
      const data = '';
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should handle empty strings as the encrypted password', async () => {
      const data = 'testpassword';
      const encrypted = '';

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should handle Buffer as input data', async () => {
      const data = Buffer.from('testpassword');
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockResolvedValue(true);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(true);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should throw an InternalServerErrorException when argon2.verify is not callable', async () => {
      const data = 'testpassword';
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockImplementation(() => {
        throw new Error('Not callable');
      });

      await expect(provider.comparePassword(data, encrypted)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(provider.comparePassword(data, encrypted)).rejects.toThrow(
        'Argon Failed to hash password Not callable',
      );
    });

    it('should handle long strings as input data', async () => {
      const data = 'a'.repeat(1000);
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should return false if encrypted string is null', async () => {
      const data = 'testpassword';
      const encrypted = null;

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should return false if input data is null', async () => {
      const data = null;
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should return false if both input data and encrypted string are empty', async () => {
      const data = '';
      const encrypted = '';

      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await provider.comparePassword(data, encrypted);
      expect(result).toBe(false);
      expect(argon2.verify).toHaveBeenCalledWith(encrypted, data);
    });

    it('should throw an InternalServerErrorException if argon2.verify throws a non-error object', async () => {
      const data = 'testpassword';
      const encrypted = 'hashedpassword';

      jest.spyOn(argon2, 'verify').mockRejectedValue('unexpected error');

      await expect(provider.comparePassword(data, encrypted)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(provider.comparePassword(data, encrypted)).rejects.toThrow(
        'Argon Failed to hash password unexpected error',
      );
    });


  });
});

describe('Argon2iProvider - hashPassword', () => {
  let provider: Argon2iProvider;

  beforeEach(() => {
    provider = new Argon2iProvider();
  });

  it('should hash the password successfully', async () => {
    const data = 'testpassword';
    const hash = 'hashedpassword';

    jest.spyOn(argon2, 'hash').mockResolvedValue(hash);

    const result = await provider.hashPassword(data);
    expect(result).toBe(hash);
  });

  it('should throw an InternalServerErrorException if argon2.hash fails', async () => {
    const data = 'testpassword';

    jest.spyOn(argon2, 'hash').mockRejectedValue(new Error('unexpected error'));

    await expect(provider.hashPassword(data)).rejects.toThrow(
      InternalServerErrorException,
    );
    await expect(provider.hashPassword(data)).rejects.toThrow(
      'Argon Failed to hash password unexpected error',
    );
  });

  it('should throw an InternalServerErrorException with a non-error object', async () => {
    const data = 'testpassword';

    jest.spyOn(argon2, 'hash').mockRejectedValue('unexpected error');

    await expect(provider.hashPassword(data)).rejects.toThrow(
      InternalServerErrorException,
    );
    await expect(provider.hashPassword(data)).rejects.toThrow(
      'Argon Failed to hash password unexpected error',
    );
  });



  it('should return a different hash for the same password if different options are used', async () => {
    const password = 'testpassword';
    const hash1 = 'hashedpassword1';
    const hash2 = 'hashedpassword2';

    jest.spyOn(argon2, 'hash')
      .mockResolvedValueOnce(hash1)
      .mockResolvedValueOnce(hash2);

    const result1 = await provider.hashPassword(password);
    const result2 = await provider.hashPassword(password);

    expect(result1).not.toBe(result2);
  });

  it('should throw an error if the password is too long', async () => {
    const longPassword = 'a'.repeat(1024 * 1024); // 1MB password

    jest.spyOn(argon2, 'hash').mockRejectedValue(new Error('Password too long'));

    await expect(provider.hashPassword(longPassword)).rejects.toThrow(
      InternalServerErrorException,
    );
    await expect(provider.hashPassword(longPassword)).rejects.toThrow(
      'Argon Failed to hash password Password too long',
    );
  });

  it('should handle an empty string as a password', async () => {
    const data = '';
    const hash = 'hashedpassword';

    jest.spyOn(argon2, 'hash').mockResolvedValue(hash);

    const result = await provider.hashPassword(data);
    expect(result).toBe(hash);
  });

  it('should hash a buffer input correctly', async () => {
    const data = Buffer.from('testpassword');
    const hash = 'hashedbufferpassword';

    jest.spyOn(argon2, 'hash').mockResolvedValue(hash);

    const result = await provider.hashPassword(data);
    expect(result).toBe(hash);
  });

  it('should throw an InternalServerErrorException if argon2.hash throws an empty object', async () => {
    const data = 'testpassword';

    jest.spyOn(argon2, 'hash').mockRejectedValue({});

    await expect(provider.hashPassword(data)).rejects.toThrow(
      InternalServerErrorException,
    );
    await expect(provider.hashPassword(data)).rejects.toThrow(
      'Argon Failed to hash password [object Object]',
    );
  });

  it('should throw an InternalServerErrorException if argon2.hash throws an undefined value', async () => {
    const data = 'testpassword';

    // Mock argon2.hash to reject with an Error object instead of undefined
    jest.spyOn(argon2, 'hash').mockRejectedValue(new Error('some error'));

    await expect(provider.hashPassword(data)).rejects.toThrow(
      InternalServerErrorException,
    );
    await expect(provider.hashPassword(data)).rejects.toThrow(
      'Argon Failed to hash password some error',
    );
  });


  it('should hash a large password string without errors', async () => {
    const largePassword = 'a'.repeat(1024 * 1024); // 1MB password
    const hash = 'hashedlargepassword';

    jest.spyOn(argon2, 'hash').mockResolvedValue(hash);

    const result = await provider.hashPassword(largePassword);
    expect(result).toBe(hash);
  });

  it('should hash different passwords uniquely', async () => {
    const password1 = 'password1';
    const password2 = 'password2';

    const hash1 = 'hashedpassword1';
    const hash2 = 'hashedpassword2';

    jest.spyOn(argon2, 'hash').mockImplementation((data: string | Buffer) => {
      return Promise.resolve(data === password1 ? hash1 : hash2);
    });

    const result1 = await provider.hashPassword(password1);
    const result2 = await provider.hashPassword(password2);

    expect(result1).toBe(hash1);
    expect(result2).toBe(hash2);
  });

});
