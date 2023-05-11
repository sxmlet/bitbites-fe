import {config} from "@/libs/config";
import * as querystring from "querystring";

export interface Bite {
  id?: number,
  title: string,
  content: string,
}

export interface UpdateBite {
  title?: string,
  content?: string,
}

export class BitBitesClient {

  private headers: Record<string, string>;

  constructor(idToken: string) {
    this.getAllBites = this.getAllBites.bind(this);
    this.getAllBitesFromUser = this.getAllBitesFromUser.bind(this);
    this.get = this.get.bind(this);
    this.getEndpoint = this.getEndpoint.bind(this);

    this.headers = {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    };
  }

  getEndpoint(): string {
    return config.bitesApi + '/api/v0';
  }

  async getAllBites(): Promise<Bite[]> {
    const resp = await this.get('/bites', ['bites']);
    if (!resp.ok) {
      console.log(resp);
      return [];
    }
    return resp.json();
  }

  async getAllBitesFromUser(uid: string = ''): Promise<Bite[]> {
    const resp = await this.get(`/${uid}/bites`, ['bites-' + uid]);
    if (!resp.ok) {
      console.log(resp);
      return [];
    }
    return resp.json();
  }

  async createNewBites(data: Bite): Promise<Bite|null> {
    const resp = await this.post('/bites', data);
    if (!resp.ok) {
      console.log(resp);
      return null;
    }
    return resp.json();
  }

  async editBite(data: Bite): Promise<any> {
    const body: UpdateBite = {};
    if (data.title) {
      body.title = data.title;
    }
    if (data.content) {
      body.content = data.content;
    }


    const resp = await this.patch(`/bites/${data.id}`, body)
    if (!resp.ok) {
      console.log(resp);
      return null;
    }
    return resp.json();
  }

  async deleteBite(id: string) {
    const resp = await this.delete(`/bites/${id}`);
    if (!resp.ok) {
      console.log(resp);
      return null;
    }
    return resp.json();
  }

  async get(path: string, cacheTags: string[], query: Record<string, string> = {}): Promise<Response> {
    const init: RequestInit = {
      headers: this.headers,
      method: 'GET',
    };
    if (cacheTags.length !== 0) {
      init['next'] = {
        tags: cacheTags,
      }
    }

    const queryStr = querystring.stringify(query);
    if (queryStr !== '') {
      path += `?${queryStr};`
    }

    return await fetch(this.getEndpoint() + path, init);
  }

  async post(path: string, body: any): Promise<Response> {
    return await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async delete(path: string): Promise<Response> {
    console.log(this.getEndpoint());
    return await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'DELETE',
    });
  }

  async patch(path: string, body: any): Promise<Response> {
    return await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

}

export default function newBitBitesClient(idToken: string): BitBitesClient {
  return new BitBitesClient(idToken);
}
