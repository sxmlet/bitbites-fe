import {config} from "@/libs/config";
import * as querystring from "querystring";
import {ErrorResponse, ResponseError} from "@/libs/error";
import {Bite} from "@/libs/api/models/Bite";
import {PostBite} from "@/libs/api/models/PostBite";
import {UpdateBite} from "@/libs/api/models/UpdateBite";

export class BitBitesClient {

  private readonly headers: Record<string, string>;

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

  async uploadFile(file: File): Promise<Response> {
    const resp = await this.get(`/bites/signed-url/${file.name}`, ['file-'+file.name]);
    const body = await resp.json()

    const uploadResp = await fetch(body.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      }
    })

    return handleError(uploadResp);
  }

  async getAllBites(): Promise<Bite[]> {
    const resp = await this.get('/bites', ['bites']);
    return resp.json();
  }

  async getAllBitesFromUser(uid: string = ''): Promise<Bite[]> {
    const resp = await this.get(`/${uid}/bites`, ['bites-' + uid]);
    return resp.json();
  }

  async createNewBites(data: PostBite): Promise<Bite|null> {
    const resp = await this.post('/bites', data);
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
    return resp.json();
  }

  async deleteBite(id: string) {
    const resp = await this.delete(`/bites/${id}`);
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

    return handleError(await fetch(this.getEndpoint() + path, init));
  }

  async post(path: string, body: any): Promise<Response> {
    return handleError(await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(body),
    }));
  }

  async delete(path: string): Promise<Response> {
    return handleError(await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'DELETE',
    }));
  }

  async patch(path: string, body: any): Promise<Response> {
    return handleError(await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(body),
    }));
  }

  async put(path: string, body: any): Promise<Response> {
    return handleError(await fetch(this.getEndpoint() + path, {
      headers: this.headers,
      method: 'PUT',
      body: JSON.stringify(body),
    }));
  }

}

/**
 * Factory function for the bites client.
 *
 * @param idToken The access token.
 */
export default function newBitBitesClient(idToken: string): BitBitesClient {
  return new BitBitesClient(idToken);
}

async function handleError(resp: Response): Promise<Response> {
  if (resp.ok) return resp;
  const error = new ResponseError('An error occurred during bites retrieval');
  if (resp.headers.get('Content-Type') === 'application/json') {
    const body = await resp.json() as ErrorResponse;
    error.info = body.message;
  } else {
    error.info = await resp.text();
  }
  error.status = resp.status;
  throw error;
}
