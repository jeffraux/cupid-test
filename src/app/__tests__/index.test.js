import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Home from "../page";

describe('Home', () => {
  const mockCountries = [
    { id: 1, value: 'United States' },
    { id: 2, value: 'Australia' },
    { id: 3, value: 'Philippines' },
  ];
  const mockStates = [
    { id: 1, value: 'Queensland' },
    { id: 2, value: 'Sydney' },
    { id: 3, value: 'Brisbane' },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should render the Country and State search field', async () => {
    render(<Home />);

    const countryDropdown = await screen.findByRole('searchbox', { name: 'country' });
    const stateDropdown = await screen.findByRole('searchbox', { name: 'state' });
 
    expect(countryDropdown).toBeInTheDocument();
    expect(stateDropdown).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should render the search Button disabled', async () => {
    render(<Home />);

    const searchBtn = await screen.findByRole('button', { name: "ic-search" });
 
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toBeDisabled();;
  });

  it('should render the Country dropdown with fetched data', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    );

    render(<Home />);

    const countryDropdown = await screen.findByRole('searchbox', { name: 'country' });
    expect(countryDropdown).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await userEvent.click(countryDropdown);
    expect(countryDropdown).toHaveFocus();

    const menuItem = await screen.findAllByRole('menuitem');
    expect(menuItem[0]).toBeInTheDocument();
    expect(menuItem[0].textContent.match(/United States/)).not.toBeNull();
    expect(menuItem[1].textContent.match(/Australia/)).not.toBeNull();
    expect(menuItem[2].textContent.match(/Philippines/)).not.toBeNull();
  });

  it('should fetch State data after selecting Country', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockStates),
      })
    );

    render(<Home />);

    const countryDropdown = await screen.findByRole('searchbox', { name: 'country' });
    expect(countryDropdown).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await userEvent.click(countryDropdown);
    expect(countryDropdown).toHaveFocus();

    const menuItem = await screen.findAllByRole('menuitem');
    expect(menuItem[0]).toBeInTheDocument();
    expect(menuItem[0].textContent.match(/United States/)).not.toBeNull();
    expect(menuItem[1].textContent.match(/Australia/)).not.toBeNull();
    expect(menuItem[2].textContent.match(/Philippines/)).not.toBeNull();

    await userEvent.click(menuItem[1]);

    expect(menuItem[0]).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should render the State dropdown with fetched data', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockStates),
      })
    );

    render(<Home />);

    const countryDropdown = await screen.findByRole('searchbox', { name: 'country' });
    expect(countryDropdown).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await userEvent.click(countryDropdown);
    expect(countryDropdown).toHaveFocus();

    const countryMenuItem = await screen.findAllByRole('menuitem');
    expect(countryMenuItem[0]).toBeInTheDocument();
    expect(countryMenuItem[0].textContent.match(/United States/)).not.toBeNull();
    expect(countryMenuItem[1].textContent.match(/Australia/)).not.toBeNull();
    expect(countryMenuItem[2].textContent.match(/Philippines/)).not.toBeNull();

    await userEvent.click(countryMenuItem[1]);

    expect(countryMenuItem[0]).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const stateDropdown = await screen.findByRole('searchbox', { name: 'state' });
    expect(stateDropdown).toBeInTheDocument();
    await userEvent.click(stateDropdown);

    const stateMenuItem = await screen.findAllByRole('menuitem');
    expect(stateMenuItem[0]).toBeInTheDocument();
    expect(stateMenuItem[0].textContent.match(/Queensland/)).not.toBeNull();
    expect(stateMenuItem[1].textContent.match(/Sydney/)).not.toBeNull();
    expect(stateMenuItem[2].textContent.match(/Brisbane/)).not.toBeNull();
  });

  it('should enable the Search button after selecting a State', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockStates),
      })
    );

    render(<Home />);

    const countryDropdown = await screen.findByRole('searchbox', { name: 'country' });
    expect(countryDropdown).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await userEvent.click(countryDropdown);
    expect(countryDropdown).toHaveFocus();

    const countryMenuItem = await screen.findAllByRole('menuitem');
    expect(countryMenuItem[0]).toBeInTheDocument();
    expect(countryMenuItem[0].textContent.match(/United States/)).not.toBeNull();
    expect(countryMenuItem[1].textContent.match(/Australia/)).not.toBeNull();
    expect(countryMenuItem[2].textContent.match(/Philippines/)).not.toBeNull();

    await userEvent.click(countryMenuItem[1]);

    expect(countryMenuItem[0]).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const stateDropdown = await screen.findByRole('searchbox', { name: 'state' });
    expect(stateDropdown).toBeInTheDocument();
    await userEvent.click(stateDropdown);

    const stateMenuItem = await screen.findAllByRole('menuitem');
    expect(stateMenuItem[0]).toBeInTheDocument();
    expect(stateMenuItem[0].textContent.match(/Queensland/)).not.toBeNull();
    expect(stateMenuItem[1].textContent.match(/Sydney/)).not.toBeNull();
    expect(stateMenuItem[2].textContent.match(/Brisbane/)).not.toBeNull();

    await userEvent.click(stateMenuItem[1]);

    expect(stateMenuItem[0]).not.toBeInTheDocument();

    const searchBtn = await screen.findByRole('button', { name: "ic-search" });
 
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeDisabled();
  });

  it('should fetch Geolocation data when clicking Search button', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries),
      })
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockStates),
      })
    );

    const mockGeolocation = [
      { lat: "52.5487921", lon: "-1.8164308" },
    ];
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGeolocation),
      })
    );

    render(<Home />);

    const countryDropdown = await screen.findByRole('searchbox', { name: 'country' });
    expect(countryDropdown).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await userEvent.click(countryDropdown);
    expect(countryDropdown).toHaveFocus();

    const countryMenuItem = await screen.findAllByRole('menuitem');
    expect(countryMenuItem[0]).toBeInTheDocument();
    expect(countryMenuItem[0].textContent.match(/United States/)).not.toBeNull();
    expect(countryMenuItem[1].textContent.match(/Australia/)).not.toBeNull();
    expect(countryMenuItem[2].textContent.match(/Philippines/)).not.toBeNull();

    await userEvent.click(countryMenuItem[1]);

    expect(countryMenuItem[0]).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const stateDropdown = await screen.findByRole('searchbox', { name: 'state' });
    expect(stateDropdown).toBeInTheDocument();
    await userEvent.click(stateDropdown);

    const stateMenuItem = await screen.findAllByRole('menuitem');
    expect(stateMenuItem[0]).toBeInTheDocument();
    expect(stateMenuItem[0].textContent.match(/Queensland/)).not.toBeNull();
    expect(stateMenuItem[1].textContent.match(/Sydney/)).not.toBeNull();
    expect(stateMenuItem[2].textContent.match(/Brisbane/)).not.toBeNull();

    await userEvent.click(stateMenuItem[1]);

    expect(stateMenuItem[0]).not.toBeInTheDocument();

    const searchBtn = await screen.findByRole('button', { name: "ic-search" });
 
    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).not.toBeDisabled();

    await userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });
});
