-- Trigger function:
-- On insertion of a new reaction, update that user's npos_reacts whose the post is
-- And then change his or her rank if so happens
CREATE FUNCTION on_react() RETURNS trigger as $on_react_trigger$
    DECLARE
        post_reacted_on INTEGER;
        uid_to_update VARCHAR;
        user_whose_post RECORD;
        pos_or_neg RECORD;
        new_npos INTEGER;
        profile_rec RECORD;
    BEGIN
        -- working on table post_reactions, so new is the new record of that table
        -- first check if the reaction is positive or negative
        SELECT pos_neg INTO pos_or_neg
        FROM reactions r WHERE reaction_id = new.reaction_id;

        -- if the reaction is positive, update the user's npos_react count
        if (pos_or_neg.pos_neg = 'positive') then
            post_reacted_on = new.post_id;

            SELECT posts.post_id as post_id, ut.user_id as uid INTO user_whose_post
            FROM posts
            RIGHT JOIN users_table ut on posts.postedby_uid = ut.user_id
            WHERE posts.post_id = post_reacted_on;

            uid_to_update = user_whose_post.uid;

            SELECT npos_reacts INTO profile_rec
            FROM profiles WHERE user_id = uid_to_update;

            new_npos = profile_rec.npos_reacts + 1;
            UPDATE profiles
            SET npos_reacts = new_npos
            WHERE user_id = uid_to_update;

            -- since it was updated, check if the user advanced in rank
            if (new_npos >= 10 ) then
                UPDATE profiles
                SET rank_id = 1
                WHERE user_id = uid_to_update;
            elsif (new_npos >= 15) then
                UPDATE profiles
                SET rank_id = 1
                WHERE user_id = uid_to_update;
            elsif (new_npos >= 20) then
                UPDATE profiles
                SET rank_id = 1
                WHERE user_id = uid_to_update;
            elsif (new_npos >= 25) then
                UPDATE profiles
                SET rank_id = 1
                WHERE user_id = uid_to_update;
            end if;
        end if;
        RETURN NULL; -- result ignored since this is an after trigger
    END;
$on_react_trigger$ language plpgsql;

CREATE TRIGGER on_react_trigger
    AFTER INSERT ON post_reactions
    FOR EACH ROW EXECUTE PROCEDURE on_react();
