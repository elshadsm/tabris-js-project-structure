/* eslint-disable @typescript-eslint/no-explicit-any */
import { shared, inject } from 'tabris-decorators';
import { Address } from '@models/Address';
import { Company } from '@models/Company';
import { User } from '@models/User';
import { Geo } from '@models/Geo';
import Request from '@services/Request';

const URL = 'https://jsonplaceholder.typicode.com/users';
const KEY_USER_DATA = 'user-data';

@shared
export class UserRepository {

  @inject private request: Request

  private userList: User[] = [];

  public get(): User[] {
    if (!this.userList.length) {
      this.userList = this.loadFromStorage();
    }
    return this.userList;
  }

  public async sync(): Promise<void> {
    try {
      const response = await this.request.get({ url: URL });
      this.userList = this.mapUsers(response);
      this.persist();
    } catch (error) {
      console.error(error);
    }
  }

  private loadFromStorage(): User[] {
    const data = localStorage.getItem(KEY_USER_DATA);
    return data ? JSON.parse(data) : [];
  }

  private persist() {
    localStorage.setItem(KEY_USER_DATA, JSON.stringify(this.userList));
  }

  private mapUsers(response: any): User[] {
    if (!response || !response.length) {
      return [];
    }
    return response.map((data: any) => new User({
      id: data.id || null,
      name: data.name || null,
      username: data.username || null,
      email: data.email || null,
      address: this.mapAddress(data?.address),
      phone: data.phone || null,
      website: data.website || null,
      company: this.mapCompany(data.company)
    }));
  }

  private mapAddress(data: any): Address {
    if (!data) {
      return null;
    }
    return new Address({
      street: data.street || null,
      suite: data.suite || null,
      city: data.city || null,
      zipcode: data.zipcode || null,
      geo: data.geo || null
    });
  }

  private mapCompany(data: any): Company {
    if (!data) {
      return null;
    }
    return new Company({
      name: data.name || null,
      catchPhrase: data.catchPhrase || null,
      bs: data.bs || null
    });
  }

  private mapGeo(data: any): Geo {
    if (!data) {
      return null;
    }
    return new Geo({
      lat: data.lat || null,
      lng: data.lng || null
    });
  }

}
