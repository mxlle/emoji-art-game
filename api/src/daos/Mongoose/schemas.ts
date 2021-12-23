import {Schema} from 'mongoose';
import {getPlayersWithRequiredAction} from '@gameFunctions';

export const PictureSchema: Schema = new Schema({
    card: String,
    painterTheme: {type: String, required: false},
    buyerTheme: {type: String, required: false},
    buyerSelection: {type: [{
            theme: String,
            players: [String]
        }], required: false},
    isFake: {type: Boolean, required: false}
});

export const PlayerSchema: Schema = new Schema({
    id: String,
    name: String,
    color: {type: String, required: false},
    role: {type: String, required: false},
    pictures: [PictureSchema]
});

export const RoundSchema: Schema = new Schema({
    themes: [String],
    demand: {type: Number, required: false},
    pictures: [PictureSchema]
});

const GameSchema: Schema = new Schema({
    id: String,
    name: String,
    players: [PlayerSchema],
    hostId: String,

    deck: [String],

    currentRound: Number,
    phase: Number,

    rounds: [RoundSchema],

    teamPoints: [PictureSchema],
    fakePoints: [PictureSchema],
    neutralCards: [PictureSchema],

    creationTime: Date,
    startTime: Date,
    endTime: Date,
}, { toJSON: { virtuals: true } });

GameSchema.virtual('actionRequiredFrom').get(function() {
    // @ts-ignore
    return getPlayersWithRequiredAction(this);
});

export {GameSchema};
