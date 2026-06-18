# Agents Documentation

This directory contains documentation for AI agents interacting with or managing this project. 

## Supported Agent Capabilities

Agents can be configured to perform the following tasks within this repository:

### 1. Content Generation & Expansion
- **Summarization**: Extract key information from large PDFs and Markdown files to generate high-level summaries.
- **Expansion**: Take simple bullet points or short summaries and expand them into human-readable, long-form content (e.g., creating `index.html` from `SUMMARY.md`).
- **Tone Adjustment**: Reformat existing text to match specific reading levels (e.g., "High School Graduate") or personas (e.g., "Policy Advocate").

### 2. Web Development & Deployment
- **HTML/CSS Generation**: Generate semantic, accessible HTML5 and modern CSS3 based on predefined design tokens (color palettes, typography).
- **Multi-page Orchestration**: Create linked internal site structures with working navigation and Table of Contents.
- **Link Integrity Checks**: Verify that all internal anchors (`#section`) and relative links (`file.html`) across the project are functional.

### 3. Image Generation & Asset Management
- **AI Image Generation**: Generate contextual images (skylines, architectural visualizations, illustrations) for case study pages using AI image generation tools.
- **Image Integration**: Add responsive `<img>` tags with proper `alt` text, captions, and CSS styling (`section-image`, `hero-image` classes).
- **Asset Organization**: Store generated images in the `assets/` directory with descriptive filenames.

### 4. Documentation & Maintenance
- **Copyright Management**: Automatically update copyright years across all HTML files in the repository.
- **File Maintenance**: Ensure structural integrity of HTML (closing tags, valid nesting) after programmatic edits.

## Integration Patterns

When using an agent with this repository, consider the following patterns:

### Human-in-the-Loop (HITL)
For complex content generation (like the case studies), it is recommended to use a **Drafting Pattern**:
1. Agent generates a draft file (`draft_toronto.html`).
2. Human reviews for factual accuracy and tone.
3. Agent overwrites the target file (`toronto.html`) upon approval.

### Automated Maintenance
The repository is optimized for agents capable of executing bash commands to:
- List files (`ls`)
- Read content (`read/cat`)
- Apply precise text replacements (`edit`)
- Verify structure via automated parsing or `python` scripts.
- Copy generated image assets into `assets/`
