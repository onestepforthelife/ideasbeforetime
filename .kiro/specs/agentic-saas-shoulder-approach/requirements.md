# Requirements Document: Agentic SaaS "Shoulder Approach" System

## Introduction

The Agentic SaaS "Shoulder Approach" System is a high-ticket SaaS reseller business targeting US plumbers, electricians, and blue-collar tradesmen. The system provides automated missed call recovery and customer lifecycle management using GoHighLevel (GHL) as the execution platform and a self-optimizing Agentic AI layer for continuous improvement. The core philosophy is "Automation without Intermediation" - the system acts as a supportive shoulder, not a gatekeeper.

## Glossary

- **GHL (GoHighLevel)**: White-label SaaS platform providing CRM, automation workflows, and communication tools
- **Shoulder Approach**: Philosophy where the system only intervenes when the technician misses a call, maintaining the technician's direct relationship with customers
- **Conditional Call Forwarding**: Carrier feature that forwards calls only when the primary line is busy or unanswered
- **CPL (Cost Per Lead)**: Cost to acquire one qualified lead through Google Ads
- **CLV (Customer Lifetime Value)**: Total revenue generated from a customer over their entire relationship
- **AMC (Annual Maintenance Contract)**: Recurring service contract offered to customers 11 months after job completion
- **Agentic AI**: Self-optimizing AI system consisting of specialized agents (Monitor, CX, Diagnostic, Optimizing, Retention)
- **DLT/A2P**: Distributed Ledger Technology / Application-to-Person SMS registration for compliance
- **Job Saver System**: The branded product name for the complete automation solution

## Requirements

### Requirement 1: Conditional Call Forwarding Trigger System

**User Story:** As a technician, I want my missed calls to be automatically captured and followed up, so that I never lose a potential customer when I'm busy on another job.

#### Acceptance Criteria

1. WHEN a call to the technician's primary number is busy or unanswered, THEN the System SHALL forward the call to the GHL tracking number via conditional forwarding
2. WHEN the conditional forwarding code is activated, THEN the System SHALL verify activation through a weekly automated test call
3. IF the weekly test call reaches voicemail instead of GHL, THEN the System SHALL alert the technician to reactivate the forwarding code
4. WHEN a forwarded call is received by GHL, THEN the System SHALL log the call with timestamp, caller ID, and call status
5. WHEN the technician answers their primary number directly, THEN the System SHALL NOT intervene or capture the call

### Requirement 2: Missed Call Recovery Automation

**User Story:** As a potential customer, I want to receive an immediate text response when my call isn't answered, so that I know the technician received my call and can quickly get service.

#### Acceptance Criteria

1. WHEN a call to the GHL tracking number has status "No Answer", THEN the System SHALL send an SMS within 30 seconds using the technician's name and branding
2. WHEN the initial SMS is sent, THEN the System SHALL include a clear call-to-action asking if the customer needs service (e.g., "Reply YES for a quote")
3. IF the customer does not reply within 5 minutes, THEN the System SHALL send a follow-up email with the same offer
4. WHEN the customer replies YES to the SMS, THEN the System SHALL send standardized pricing information within 60 seconds
5. WHEN the customer replies with booking intent (e.g., "BOOK" or "CALL"), THEN the System SHALL notify the technician immediately and create a lead in GHL pipeline

### Requirement 3: Multi-Agent AI Optimization System

**User Story:** As a business owner, I want the system to automatically detect and fix performance issues, so that my cost per lead stays low and conversion rates stay high without manual intervention.

#### Acceptance Criteria

1. WHEN the Monitor Agent detects CPL exceeds $30 for 3 consecutive days, THEN the System SHALL trigger the Diagnostic Agent to analyze root cause
2. WHEN the Monitor Agent detects lead-to-booking rate drops below 25% for 7 days, THEN the System SHALL trigger the Diagnostic Agent to identify failure points
3. WHEN the Diagnostic Agent identifies a failing ad group (wrong search terms), THEN the Optimizing Agent SHALL pause that ad group within 1 hour
4. WHEN the Diagnostic Agent identifies offer/pricing script failure, THEN the Optimizing Agent SHALL propose an A/B test variant of the SMS script
5. WHEN the Optimizing Agent proposes a change, THEN the System SHALL execute the change via GHL API or Google Ads API and monitor results for 7 days

### Requirement 4: Customer Lifecycle Value Maximization

**User Story:** As a technician, I want the system to automatically request reviews and offer maintenance contracts, so that I build my reputation and generate recurring revenue without manual follow-up.

#### Acceptance Criteria

1. WHEN a job status changes to "Completed" in the GHL pipeline, THEN the Retention Agent SHALL send a review request link 4 hours after completion
2. WHEN a job is marked complete, THEN the System SHALL schedule an AMC offer to be sent 11 months after the completion date
3. WHEN the AMC offer is sent, THEN the System SHALL personalize the message with the customer's name, service history, and technician's branding
4. WHEN a customer leaves a review, THEN the System SHALL log the review rating and send a thank-you message within 24 hours
5. WHEN a customer accepts an AMC offer, THEN the System SHALL create a new opportunity in the GHL pipeline and notify the technician

### Requirement 5: Compliance and Security Management

**User Story:** As a business owner, I want the system to comply with US anti-spam laws and Indian DLT requirements, so that my SMS messages are delivered reliably and I avoid legal issues.

#### Acceptance Criteria

1. WHEN a new business owner registers, THEN the System SHALL require complete KYC documentation (PAN, Aadhaar/ID) before enabling SMS features
2. WHEN SMS messages are sent to US numbers, THEN the System SHALL include opt-out instructions in compliance with TCPA regulations
3. WHEN a customer opts out of SMS, THEN the System SHALL immediately add the number to a suppression list and prevent future SMS
4. WHEN the system sends A2P SMS, THEN the System SHALL use DLT-registered sender IDs with approved message templates
5. WHEN API keys are stored, THEN the System SHALL encrypt them at rest and never expose them in client-side JavaScript

### Requirement 6: Human Accountability Guardrails

**User Story:** As a business owner, I want mandatory daily checks and audits, so that automation failures are caught quickly and customer inquiries don't go unanswered.

#### Acceptance Criteria

1. WHEN the GHL Unified Inbox receives a message, THEN the System SHALL flag messages requiring human review (nuanced questions, complaints, complex requests)
2. WHEN a flagged message is not reviewed within 12 hours, THEN the System SHALL send an alert to the business owner
3. WHEN the weekly conditional forwarding audit is due, THEN the System SHALL send a reminder to verify the forwarding code is active
4. WHEN a lead status is not updated within 48 hours of creation, THEN the System SHALL alert the technician to update the pipeline status
5. WHEN the daily inbox check is missed for 2 consecutive days, THEN the System SHALL escalate the alert to the business owner via phone call

### Requirement 7: Financial Tracking and Reporting

**User Story:** As a business owner, I want real-time visibility into my ad spend, lead costs, and revenue, so that I can make informed decisions about scaling my business.

#### Acceptance Criteria

1. WHEN Google Ads spend is recorded, THEN the System SHALL calculate and display current CPL in real-time on the dashboard
2. WHEN a lead converts to a booking, THEN the System SHALL calculate the lead-to-booking conversion rate and update the dashboard
3. WHEN monthly revenue is calculated, THEN the System SHALL display MRR in both USD and INR using the current exchange rate
4. WHEN the CPL exceeds the $30 threshold, THEN the System SHALL display a warning alert on the dashboard
5. WHEN a monthly report is generated, THEN the System SHALL include: total ad spend, total leads, CPL, booking rate, revenue, and ROI

### Requirement 8: GHL Workflow Integration

**User Story:** As a system administrator, I want all automation workflows to be properly configured in GHL, so that the AI agents can execute their tasks through the GHL API.

#### Acceptance Criteria

1. WHEN a GHL sub-account is created for a new technician, THEN the System SHALL automatically configure the 5 core workflows (Missed Call Recovery, Offer/Quote, Booking Confirmation, Post-Job Review, Post-Job AMC)
2. WHEN a workflow is triggered, THEN the System SHALL log the trigger event, execution time, and outcome in the GHL activity log
3. WHEN the CX Agent modifies an SMS script, THEN the System SHALL update the corresponding GHL workflow within 5 minutes
4. WHEN a workflow fails to execute, THEN the System SHALL retry up to 3 times and alert the system administrator if all retries fail
5. WHEN a technician's branding information is updated, THEN the System SHALL propagate the changes to all 5 workflows within 10 minutes

### Requirement 9: Google Ads Integration and Optimization

**User Story:** As a business owner, I want my Google Ads campaigns to be automatically optimized based on performance data, so that I get the best ROI without manual campaign management.

#### Acceptance Criteria

1. WHEN a new technician onboards, THEN the System SHALL create a Google Ads campaign targeting their service area with search intent keywords
2. WHEN the Optimizing Agent identifies a high-performing keyword, THEN the System SHALL increase the bid by 10-20% via Google Ads API
3. WHEN the Optimizing Agent identifies a low-performing keyword (no conversions after 50 clicks), THEN the System SHALL pause the keyword
4. WHEN the daily ad budget is set, THEN the System SHALL monitor spend and pause campaigns if the daily limit is reached
5. WHEN a search term report shows irrelevant queries, THEN the System SHALL add negative keywords to prevent wasted spend

### Requirement 10: Onboarding and Setup Automation

**User Story:** As a new technician customer, I want a simple onboarding process that gets me up and running quickly, so that I can start recovering missed calls within 24 hours.

#### Acceptance Criteria

1. WHEN a new technician signs up, THEN the System SHALL collect: business name, primary phone number, service area, service types, and pricing
2. WHEN onboarding information is submitted, THEN the System SHALL provision a GHL sub-account within 15 minutes
3. WHEN the GHL sub-account is created, THEN the System SHALL provide step-by-step instructions for setting up conditional call forwarding
4. WHEN the technician completes the forwarding setup, THEN the System SHALL run a test call to verify the configuration
5. WHEN the test call succeeds, THEN the System SHALL activate the Google Ads campaign and send a welcome email with dashboard access

---

**Status:** Requirements Complete - Ready for Design Phase  
**Created:** December 6, 2025  
**Business Goal:** ₹5 Lakh ($6,000+) MRR within 12 months  
**Target Market:** US Plumbers, Electricians, Blue-Collar Tradesmen  
**Core Philosophy:** Automation without Intermediation (The Shoulder Approach)
