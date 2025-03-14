create type "public"."album_type" as enum ('ALBUM', 'SINGLE', 'COMPILATION');

create table "public"."album_artists" (
    "created_at" timestamp with time zone not null default now(),
    "album_id" uuid not null,
    "artist_id" uuid not null
);


alter table "public"."album_artists" enable row level security;

create table "public"."album_tracks" (
    "album_id" uuid not null,
    "track_id" uuid not null,
    "position" integer,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."album_tracks" enable row level security;

create table "public"."albums" (
    "id" uuid not null default gen_random_uuid(),
    "spotify_id" text not null,
    "name" text not null,
    "release_date" date,
    "cover_image" text,
    "created_at" timestamp with time zone not null default now(),
    "type" album_type
);


alter table "public"."albums" enable row level security;

create table "public"."track_artists" (
    "artist_id" uuid not null,
    "track_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."track_artists" enable row level security;

CREATE UNIQUE INDEX album_artists_pkey ON public.album_artists USING btree (album_id, artist_id);

CREATE UNIQUE INDEX album_tracks_pkey ON public.album_tracks USING btree (album_id, track_id);

CREATE UNIQUE INDEX albums_pkey ON public.albums USING btree (id);

CREATE UNIQUE INDEX track_artists_pkey ON public.track_artists USING btree (artist_id, track_id);

alter table "public"."album_artists" add constraint "album_artists_pkey" PRIMARY KEY using index "album_artists_pkey";

alter table "public"."album_tracks" add constraint "album_tracks_pkey" PRIMARY KEY using index "album_tracks_pkey";

alter table "public"."albums" add constraint "albums_pkey" PRIMARY KEY using index "albums_pkey";

alter table "public"."track_artists" add constraint "track_artists_pkey" PRIMARY KEY using index "track_artists_pkey";

alter table "public"."album_artists" add constraint "album_artists_album_id_fkey" FOREIGN KEY (album_id) REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."album_artists" validate constraint "album_artists_album_id_fkey";

alter table "public"."album_artists" add constraint "album_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES artists(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."album_artists" validate constraint "album_artists_artist_id_fkey";

alter table "public"."album_tracks" add constraint "album_tracks_album_id_fkey" FOREIGN KEY (album_id) REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."album_tracks" validate constraint "album_tracks_album_id_fkey";

alter table "public"."album_tracks" add constraint "album_tracks_track_id_fkey" FOREIGN KEY (track_id) REFERENCES tracks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."album_tracks" validate constraint "album_tracks_track_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES artists(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_track_id_fkey" FOREIGN KEY (track_id) REFERENCES tracks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_track_id_fkey";

grant delete on table "public"."album_artists" to "anon";

grant insert on table "public"."album_artists" to "anon";

grant references on table "public"."album_artists" to "anon";

grant select on table "public"."album_artists" to "anon";

grant trigger on table "public"."album_artists" to "anon";

grant truncate on table "public"."album_artists" to "anon";

grant update on table "public"."album_artists" to "anon";

grant delete on table "public"."album_artists" to "authenticated";

grant insert on table "public"."album_artists" to "authenticated";

grant references on table "public"."album_artists" to "authenticated";

grant select on table "public"."album_artists" to "authenticated";

grant trigger on table "public"."album_artists" to "authenticated";

grant truncate on table "public"."album_artists" to "authenticated";

grant update on table "public"."album_artists" to "authenticated";

grant delete on table "public"."album_artists" to "service_role";

grant insert on table "public"."album_artists" to "service_role";

grant references on table "public"."album_artists" to "service_role";

grant select on table "public"."album_artists" to "service_role";

grant trigger on table "public"."album_artists" to "service_role";

grant truncate on table "public"."album_artists" to "service_role";

grant update on table "public"."album_artists" to "service_role";

grant delete on table "public"."album_tracks" to "anon";

grant insert on table "public"."album_tracks" to "anon";

grant references on table "public"."album_tracks" to "anon";

grant select on table "public"."album_tracks" to "anon";

grant trigger on table "public"."album_tracks" to "anon";

grant truncate on table "public"."album_tracks" to "anon";

grant update on table "public"."album_tracks" to "anon";

grant delete on table "public"."album_tracks" to "authenticated";

grant insert on table "public"."album_tracks" to "authenticated";

grant references on table "public"."album_tracks" to "authenticated";

grant select on table "public"."album_tracks" to "authenticated";

grant trigger on table "public"."album_tracks" to "authenticated";

grant truncate on table "public"."album_tracks" to "authenticated";

grant update on table "public"."album_tracks" to "authenticated";

grant delete on table "public"."album_tracks" to "service_role";

grant insert on table "public"."album_tracks" to "service_role";

grant references on table "public"."album_tracks" to "service_role";

grant select on table "public"."album_tracks" to "service_role";

grant trigger on table "public"."album_tracks" to "service_role";

grant truncate on table "public"."album_tracks" to "service_role";

grant update on table "public"."album_tracks" to "service_role";

grant delete on table "public"."albums" to "anon";

grant insert on table "public"."albums" to "anon";

grant references on table "public"."albums" to "anon";

grant select on table "public"."albums" to "anon";

grant trigger on table "public"."albums" to "anon";

grant truncate on table "public"."albums" to "anon";

grant update on table "public"."albums" to "anon";

grant delete on table "public"."albums" to "authenticated";

grant insert on table "public"."albums" to "authenticated";

grant references on table "public"."albums" to "authenticated";

grant select on table "public"."albums" to "authenticated";

grant trigger on table "public"."albums" to "authenticated";

grant truncate on table "public"."albums" to "authenticated";

grant update on table "public"."albums" to "authenticated";

grant delete on table "public"."albums" to "service_role";

grant insert on table "public"."albums" to "service_role";

grant references on table "public"."albums" to "service_role";

grant select on table "public"."albums" to "service_role";

grant trigger on table "public"."albums" to "service_role";

grant truncate on table "public"."albums" to "service_role";

grant update on table "public"."albums" to "service_role";

grant delete on table "public"."track_artists" to "anon";

grant insert on table "public"."track_artists" to "anon";

grant references on table "public"."track_artists" to "anon";

grant select on table "public"."track_artists" to "anon";

grant trigger on table "public"."track_artists" to "anon";

grant truncate on table "public"."track_artists" to "anon";

grant update on table "public"."track_artists" to "anon";

grant delete on table "public"."track_artists" to "authenticated";

grant insert on table "public"."track_artists" to "authenticated";

grant references on table "public"."track_artists" to "authenticated";

grant select on table "public"."track_artists" to "authenticated";

grant trigger on table "public"."track_artists" to "authenticated";

grant truncate on table "public"."track_artists" to "authenticated";

grant update on table "public"."track_artists" to "authenticated";

grant delete on table "public"."track_artists" to "service_role";

grant insert on table "public"."track_artists" to "service_role";

grant references on table "public"."track_artists" to "service_role";

grant select on table "public"."track_artists" to "service_role";

grant trigger on table "public"."track_artists" to "service_role";

grant truncate on table "public"."track_artists" to "service_role";

grant update on table "public"."track_artists" to "service_role";


