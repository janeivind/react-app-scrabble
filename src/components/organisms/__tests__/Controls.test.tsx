import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Controls } from '..';
import { FC } from 'react';
import { ScrabbleProvider } from 'components/ScrabbleProvider';



describe("Controls", () => {

  const WrapperControls: FC = () => (
    <ScrabbleProvider>
      <Controls/>
    </ScrabbleProvider>
  );

  test("render a deal button", () => {
    render(<WrapperControls />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  test("render selector for number of tiles", () => {
    render(<WrapperControls />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

});
