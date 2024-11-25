import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import { describe, expect, test, vi } from "vitest";
import { ScrabbleProviderContext } from 'components/ScrabbleProvider';
import { FC } from 'react';
import NumberOfTiles from '../NumberOfTiles';

const setNumberOfTilesMock = vi.fn();

const WrapperNumberOfTiles: FC = () => {
  return (
    <ScrabbleProviderContext.Provider
      value={{
        dealNewTiles: vi.fn(),
        setNumberOfTiles: setNumberOfTilesMock,
        selectedTiles: [],
        numberOfTiles: 7,
        loadingResult: false,
        validWords: [],
      }}
    >
      <NumberOfTiles />
    </ScrabbleProviderContext.Provider>
  );
};


describe("NumberOfTiles", () => {
  test("has a radio selection for number",  () => {
    render(
       <WrapperNumberOfTiles/>
     );
    expect(screen.getByRole('radiogroup')).toBeTruthy();
    expect(screen.getAllByRole('radio').length).toBeGreaterThan(1);
   });

  test("calls setNumberOfTiles when used", async () => {
   render(
      <WrapperNumberOfTiles/>
    );
    const selectionButton = screen.getByRole('radio', {
      name: (_, element) => {
        return element?.getAttribute('value') === '10';
      },
    });

    await user.click(selectionButton);
    expect(setNumberOfTilesMock).toHaveBeenCalledWith(10);
  });
});