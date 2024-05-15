import { UseCaseError } from '../use-case-error.contract';

export class UnableRemoveError extends Error implements UseCaseError {
  constructor(message: string = 'Unable to remove') {
    super(message);
  }
}
