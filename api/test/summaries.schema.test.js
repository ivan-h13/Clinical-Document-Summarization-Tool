import test from "node:test";
import assert from "node:assert/strict";

import { NarrativeSummarySchema, SummariesRequestSchema } from "../src/schemas/summaries.schema.js";

test("summaries request schema accepts narrative format", () => {
  const parsed = SummariesRequestSchema.parse({
    tenantId: "clinic-main",
    note: { raw: "Patient reports headache for 3 days." },
    options: {
      format: "narrative",
      plainLanguage: true,
      temperature: 0.2
    }
  });

  assert.equal(parsed.options.format, "narrative");
  assert.equal(parsed.options.plainLanguage, true);
});

test("narrative summary schema accepts narrative output", () => {
  const parsed = NarrativeSummarySchema.parse({
    narrative: "The client reported headache for three days. No safety concerns were noted in the provided text."
  });

  assert.equal(typeof parsed.narrative, "string");
});
