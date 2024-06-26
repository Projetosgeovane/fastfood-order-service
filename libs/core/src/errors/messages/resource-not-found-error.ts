import { UseCaseError } from '../use-case-error.contract';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(message: string = 'Resource not found') {
    super(message);
  }
}
