// @flow

type Position = {
    x: number,
    y: number,
};

type Direction = Position;

type Character = {
    id: number,
    direction: Direction,
};

type Tile = {
    weight: number,
    content?: Character,
    hasMain?: boolean
};

type Grid = [[Tile]];

type Action<T, J> = {
    type: string,
    payload: T,
    err?: boolean,
    meta?: J,

}

export type { Position, Direction, Grid, Tile, Character, Action };