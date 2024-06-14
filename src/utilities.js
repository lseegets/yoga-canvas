let nextPoseId = 0;
export function generatePoseId() {
    const result = nextPoseId;
    nextPoseId += 1;
    return result;
}

let nextListId = 0;
export function generateListId() {
    const result = nextListId;
    nextListId += 1;
    return result;
}