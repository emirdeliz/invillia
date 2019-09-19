import React from "react";
import { shallow } from "enzyme";
import { Marker } from "react-native-maps";
import locations from "./__mock__/locations.json";
import Home from "../../src/screens/Home/Home";

// @ts-ignore
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

jest.mock("expo-permissions", () => ({
  askAsync: () => ({ status: "granted" }),
}));

jest.mock("expo-location", () => ({
  getCurrentPositionAsync: () => ({ coords: { latitude: 37.78825, longitude: -122.4324 } }),
}));

const mockFetchPromise = Promise.resolve({ // 3
  json: () => locations,
});

describe("<Home />", () => {
  it("renders without crashing", async () => {
    const wrapper = shallow(<Home screenProps={{}}/>);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    expect(wrapper.find(Marker).length).toEqual(2);
  });
});