
-- Recreate the database tables with proper schema
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying,
  travel_date character varying,
  group_size character varying,
  message text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email character varying NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.booking_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  legal_name character varying,
  first_name character varying,
  last_name character varying,
  email character varying NOT NULL,
  phone character varying,
  nationality character varying NOT NULL DEFAULT '',
  preferred_destination character varying,
  selected_safari character varying,
  check_in_date date NOT NULL,
  check_out_date date,
  adults character varying NOT NULL DEFAULT '1',
  children character varying NOT NULL DEFAULT '0',
  children_ages character varying,
  accommodation_type character varying NOT NULL DEFAULT 'standard',
  special_requirements text,
  notes text
);
