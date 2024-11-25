import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import { describe, expect, test, vi } from "vitest";
import { Controls } from '..';
import { FC } from 'react';
import { ScrabbleProviderContext } from 'components/ScrabbleProvider';

const dealNewTilesMock = vi.fn();

const WrapperControls: FC = () => {
  return (
    <ScrabbleProviderContext.Provider
      value={{
        dealNewTiles: dealNewTilesMock,
        setNumberOfTiles: vi.fn(),
        updateTileRatio: vi.fn(),
        selectedTiles: [],
        numberOfTiles: 7,
        loadingResult: false,
        validWords: [],
      }}
    >
      <Controls />
    </ScrabbleProviderContext.Provider>
  );
};

describe("Controls", () => {

  test("render a deal button", () => {
    render(<WrapperControls />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  test("deal button calls function for new tiles", async () => {
    render(<WrapperControls />);
    const dealButton = screen.getByRole('button', { name: /Deal/});
    await user.click(dealButton);
    expect(dealNewTilesMock).toHaveBeenCalled();
  });

  test("render selector for number of tiles", () => {
    render(<WrapperControls />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

  

});
