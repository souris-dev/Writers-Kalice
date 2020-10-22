// Utilities

export function tagToId(tag) {
    switch (tag) {
        case 'poetry':
            return 1;
        case 'prose':
            return 2;
        case 'short_stories':
            return 3;
        case 'idle_thoughts':
            return 4;
        case 'parody':
            return 5;
        case 'jokes':
            return 6;
        case 'nature':
            return 7;
    }
}