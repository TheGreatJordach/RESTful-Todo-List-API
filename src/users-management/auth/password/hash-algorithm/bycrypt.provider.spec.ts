import { BcryptProvider } from './bcrypt.provider';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('BcryptProvider', () => {
  let provider: BcryptProvider;
  let configService: ConfigService;

  beforeEach(() => {
    configService = { get: jest.fn().mockReturnValue(10) } as unknown as ConfigService;
    provider = new BcryptProvider(configService);
  });

  describe('hashPassword', () => {
    it('should hash the password successfully', async () => {
      const password = 'testpassword';
      const hashedPassword = 'hashedpassword';

      // Mocking bcrypt methods
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await provider.hashPassword(password);
      expect(result).toBe(hashedPassword);
    });

    it('should throw an InternalServerErrorException if bcrypt.genSalt fails', async () => {
      const password = 'testpassword';
      (bcrypt.genSalt as jest.Mock).mockRejectedValue(new Error('salt error'));

      await expect(provider.hashPassword(password)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(provider.hashPassword(password)).rejects.toThrow(
        'Failed to hash password Error: salt error',
      );
    });

    it('should throw an InternalServerErrorException if bcrypt.hash fails', async () => {
      const password = 'testpassword';
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('hash error'));

      await expect(provider.hashPassword(password)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(provider.hashPassword(password)).rejects.toThrow(
        'Failed to hash password Error: hash error',
      );
    });
  });

  describe('comparePassword', () => {
    it('should return true if the password matches the hashed password', async () => {
      const password = 'testpassword';
      const hashedPassword = 'hashedpassword';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await provider.comparePassword(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false if the password does not match the hashed password', async () => {
      const password = 'testpassword';
      const hashedPassword = 'hashedpassword';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await provider.comparePassword(password, hashedPassword);
      expect(result).toBe(false);
    });

    it('should throw an InternalServerErrorException if bcrypt.compare fails', async () => {
      const password = 'testpassword';
      const hashedPassword = 'hashedpassword';

      (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('compare error'));

      await expect(provider.comparePassword(password, hashedPassword)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(provider.comparePassword(password, hashedPassword)).rejects.toThrow(
        'Failed !. Something happen when trying to  to compare password Error: compare error',
      );
    });
  });
});
