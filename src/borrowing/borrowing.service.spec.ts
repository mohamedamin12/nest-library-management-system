import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingService } from './borrowing.service';

describe('BorrowingService', () => {
  let service: BorrowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowingService],
    }).compile();

    service = module.get<BorrowingService>(BorrowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
