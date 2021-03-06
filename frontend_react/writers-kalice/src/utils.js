// Utilities

export function tagToId(tag) {
    switch (tag) {
        case 'poetry':
            return 1;
        case 'prose':
            return 2;
        case 'short_stories':
            return 3;
        case 'compositions':
            return 8;// due to a blunder which resulted in compositions being inserted last into the db
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