import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import fs from "fs";
// import pdfParse from "pdf-parse";

export default function Command() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [resumePath, setResumePath] = useState("");

  async function handleSubmit() {
    try {
      if (!fs.existsSync(resumePath)) {
        showToast({ style: Toast.Style.Failure, title: "Resume file not found" });
        return;
      }

      // const buffer = fs.readFileSync(resumePath);
      // const parsed = await pdfParse(buffer);

      showToast({
        style: Toast.Style.Success,
        title: "Resume Parsed!",
        message: `Company: ${company}, Position: ${position}`,
      });

      // Do something with: parsed.text, company, position, description
      // e.g., send to GPT or save for next steps

    } catch (e) {
      showToast({ style: Toast.Style.Failure, title: "Error parsing resume", message: e instanceof Error ? e.message : "Unknown error" });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="company" title="Company Name" placeholder="e.g., Stripe" value={company} onChange={setCompany} />
      <Form.TextField id="position" title="Position Title" placeholder="e.g., Software Engineer" value={position} onChange={setPosition} />
      <Form.TextArea id="description" title="Job Description" placeholder="Paste job description here..." value={description} onChange={setDescription} />
      <Form.TextField id="resumePath" title="Path to Resume PDF" placeholder="/Users/you/Documents/resume.pdf" value={resumePath} onChange={setResumePath} />
    </Form>
  );
}
