CREATE TABLE "Permalink" (
  id            SERIAL PRIMARY KEY,
  key           VARCHAR(255),  
  url           VARCHAR(255),
  description   TEXT,
  notes         TEXT,
  added_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK(EXTRACT(TIMEZONE FROM added_timestamp) = '0')
);