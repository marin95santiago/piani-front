import { Utils } from "../../../../utils/style";

export type gridHall = {
    id: number,
    key: number,
    taken: boolean,
    available: boolean,
    status: 'available' | 'taken' | 'NA',
    area?: boolean
}

export type hall = {
    grids: Array<gridHall>
};

export const utils = {
    buildMatrix: (elements: number) => {
        const arr:Array<gridHall> = [];
        for (let index = 0; index < elements; index++) {
            arr.push({id: index, key: 0, taken: false, available: false, status: 'NA'});
        }
        return arr;
    },

    styleToGrid: (grid: gridHall, editMode: boolean) => {
        const isFree = (!grid.available && !grid.taken);
        const isAvailable = grid.available;
        const isTaken = grid.taken;

        if (editMode) {
            if (isFree) {
                return {
                    background: grid.area ? Utils.palette.inArea.main : Utils.palette.hall.main,
                    border: grid.area ? `solid 1px ${Utils.palette.inArea.dark}` : `solid 1px ${Utils.palette.hall.dark}`,
                    height: '7vh',
                    ":hover": { backgroundColor: Utils.palette.hall.dark }
                }
            } else if (isAvailable) {
                return {
                    background: Utils.palette.available.main,
                    border: `solid 1px ${Utils.palette.hall.dark}`,
                    height: '7vh',
                    ":hover": { backgroundColor: Utils.palette.available.dark }
                }
            } else if (isTaken) {
                return {
                    background: Utils.palette.taken.main,
                    border: `solid 1px ${Utils.palette.hall.dark}`,
                    height: '7vh',
                    ":hover": { backgroundColor: Utils.palette.taken.dark }
                }
            }
        } else {
            return {
                background: grid.area ? Utils.palette.inArea.main : Utils.palette.hall.main,
                border: grid.area ? `solid 1px ${Utils.palette.inArea.main}` : `solid 1px ${Utils.palette.hall.main}`,
                height: '7vh'
            }
        }
    },

    sum: (array: any[], key: string) => {
        return array.reduce((a, b) => a + (b[key] || 0), 0);
    }
}