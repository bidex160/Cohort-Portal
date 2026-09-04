CREATE TABLE `enrolments` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`title` text NOT NULL,
	`hospital` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`cohort` text NOT NULL,
	`wave` text NOT NULL,
	`coordinator` text DEFAULT '' NOT NULL,
	`records_lead` text DEFAULT '' NOT NULL,
	`ict_lead` text DEFAULT '' NOT NULL,
	`finance_lead` text DEFAULT '' NOT NULL,
	`cmac_lead` text DEFAULT '' NOT NULL,
	`vendor` text DEFAULT '' NOT NULL,
	`actions` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending_review' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mou_uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`enrolment_id` text NOT NULL,
	`object_key` text NOT NULL,
	`file_name` text NOT NULL,
	`content_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`created_at` integer NOT NULL
);
