import {
  ListService,
  PaginationDetails,
} from '@evolonix/manage-list-data-access';
import {
  LocationByIdDocument,
  LocationsDocument,
} from './__generated__/graphql';

export class LocationsService extends ListService {
  async getPagedList<Location>(
    page: number,
    query: string,
  ): Promise<[Location[], PaginationDetails, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: LocationsDocument,
      variables: {
        page: page,
        filter: {
          name: query,
        },
      },
      fetchPolicy: 'no-cache',
    });

    // // For testing purposes, we can use a mock data file
    // const { data } = JSON.parse(mockLocations);
    // const error = undefined; // Simulating no error for mock data

    const locations = (data.locations?.results ?? []) as Location[];
    const info = (data.locations?.info || {}) as PaginationDetails;

    return [locations, info, error];
  }

  async getEntityById<Location>(
    id: string,
  ): Promise<[Location | undefined, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: LocationByIdDocument,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    const location = data.location as Location | undefined;
    return [location, error];
  }

  async createEntity<Location>(
    location: Omit<Location, 'id'>,
  ): Promise<[Location | undefined, Error[]]> {
    // const { data, errors } = await this.client.mutate({
    //   mutation: CreateLocationDocument,
    //   variables: { location },
    //   fetchPolicy: 'no-cache',
    // });
    // const created = data.location.create as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [created, errorList];

    const created = { ...location, id: crypto.randomUUID() } as Location;
    return [created, []];
  }

  async updateEntity<Location>(
    location: Location,
  ): Promise<[Location | undefined, Error[]]> {
    // const { __typename, ...payload } = track as Location;
    // const { data, errors } = await this.client.mutate({
    //   mutation: UpdateLocationDocument,
    //   variables: { location: payload },
    //   fetchPolicy: 'no-cache',
    // });
    // const updated = data.location.update as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [updated, errorList];

    const updated = { ...location };
    return [updated, []];
  }

  async deleteEntity(id: string): Promise<[boolean, Error[]]> {
    // const { errors } = await this.client.mutate({
    //   mutation: DeleteLocationDocument,
    //   variables: { id },
    //   fetchPolicy: 'no-cache',
    // });
    // const deleted = errors === undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [deleted, errorList];

    const deleted = id !== '';
    return [deleted, []];
  }
}
