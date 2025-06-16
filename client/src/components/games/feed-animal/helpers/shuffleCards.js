
export function shuffleCards(array) {
    try {
        // Handle null/undefined input
        if (!array) {
            console.warn('shuffleCards: Received null or undefined input');
            return [];
        }
        
        // Handle non-array inputs
        if (!Array.isArray(array)) {
            console.warn('shuffleCards: Expected an array, got', typeof array);
            return [];
        }
        
        // Return empty array if input is empty
        if (array.length === 0) {
            return [];
        }
        
        // Create a copy of the array to avoid mutating the original
        const shuffled = [...array];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Only swap if the indices are different
            if (i !== j) {
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        }
        
        return shuffled;
    } catch (error) {
        console.error('Error in shuffleCards:', error);
        // Return empty array in case of error to prevent crashes
        return [];
    }
}
