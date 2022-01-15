import { Schema } from 'mongoose';
import { getPlayersWithRequiredAction } from '@gameFunctions';

export const PictureSchema: Schema = new Schema(
  {
    card: String,
    painterTheme: { type: String, required: false },
    painterId: { type: String, required: false },
    buyerTheme: { type: String, required: false },
    buyerSelection: {
      type: [
        {
          theme: String,
          playerIds: [String],
        },
      ],
      required: false,
      default: undefined,
    },
    isFake: { type: Boolean, required: false },
    fakeStatusKnown: { type: Boolean, required: false },
  },
  { _id: false }
);

export const PlayerSchema: Schema = new Schema(
  {
    id: String,
    name: String,
    color: { type: String, required: false },
    role: { type: String, required: false },
    pictures: [PictureSchema],
  },
  { _id: false }
);

export const RoundSchema: Schema = new Schema(
  {
    themes: [String],
    demand: { type: Number, required: false },
    demandSuggestions: {
      type: [
        {
          demand: Number,
          playerIds: [String],
        },
      ],
      required: false,
      default: undefined,
    },
    pictures: [PictureSchema],
  },
  { _id: false }
);

export const JokerSchema: Schema = new Schema(
  {
    type: Number,
    phase: Number,
    role: String,
    used: Boolean,
  },
  { _id: false }
);

const GameSchema: Schema = new Schema(
  {
    id: String,
    name: String,
    players: [PlayerSchema],
    hostId: String,

    deck: [String],
    discardedDeck: [String],

    jokers: [JokerSchema],

    currentRound: Number,
    phase: Number,

    rounds: [RoundSchema],

    teamPoints: [PictureSchema],
    fakePoints: [PictureSchema],

    creationTime: Date,
    startTime: Date,
    endTime: Date,
  },
  { toJSON: { virtuals: true } }
);

GameSchema.virtual('actionRequiredFrom').get(function () {
  // @ts-ignore
  return getPlayersWithRequiredAction(this);
});

export { GameSchema };
