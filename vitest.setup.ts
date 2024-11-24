import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
