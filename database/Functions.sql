-- interm_no_interests.post_id as post_id, content, title, anonymous,
--        min_rank, expiry_date, posted_date,
--        is_above_eighteen, postedby_uid, postedby_username,
--       n_comments, n_pos_rcn, n_neg_rcn

CREATE FUNCTION get_post_data(post_id integer) RETURNS
    TABLE(
        post_id         integer,
        content         text,
        title           text,
        anonymous       boolean,
        min_rank        integer,
        expiry_date     date,
        posted_date     date,
        is_above_eighteen boolean,
        postedby_uid    integer,
        postedby_username varchar(20),
        n_comments      integer,
        n_pos_rcn       integer,
        n_neg_rcn       integer
    )
AS $$
DECLARE
    rec_a record;
BEGIN

END;
$$

select COALESCE(SUM(CASE rcn.pos_neg WHEN 'positive' THEN 1 ELSE 0 END), 0) AS n_pos_rcn,
       COALESCE(SUM (CASE rcn.pos_neg WHEN 'negative' THEN 1 ELSE 0 END), 0) AS n_neg_rcn
from post_reactions prcn, reactions as rcn where prcn.reaction_id = rcn.reaction_id;