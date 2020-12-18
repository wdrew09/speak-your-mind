export const updateObject = (object, updatedValues) => {
    return {
        ...object,
        ...updatedValues
    }
}
