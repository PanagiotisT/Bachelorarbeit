export interface IStory {
  name: string;
  description: string;
  image: string;
  unityWebGL: string;

  scenes: Array<IScene>;
  characters: ICharacter;
}

export interface IScene {
  name: string;
  text: string;
  image: string;
}

export interface ICharacter {
  total: number;
  teller: boolean;
  character: Array<string>;
}
