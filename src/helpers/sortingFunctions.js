export const sortByUpdatedAsc = (a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
};

export const sortByUpdatedDesc = (a, b) => {
    return new Date(a.updatedAt) - new Date(b.updatedAt);
};
