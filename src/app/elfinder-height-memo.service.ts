import { Injectable } from '@angular/core';

@Injectable()
export class ElfinderHeightMemoService {
  private storage: {
    [id: string]: number;
  } = {}


  constructor() { }

  public setHeight(id: string, value: number): void {
    this.storage[id] = value
  }

  public getHeight(id: string) {
    return this.storage[id]  || 0;
  }

}
