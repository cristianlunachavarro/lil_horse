export const isValidTransition = (currentStatus: string, newStatus: string): boolean => {
    const validTransitions: Record<string, string[]> = {
        'pending': ['in-progress', 'pending'],
        'in-progress': ['finished', 'pending', 'in-progress'],
        'finished': ['finished']
    };

    return validTransitions[currentStatus].includes(newStatus);
};