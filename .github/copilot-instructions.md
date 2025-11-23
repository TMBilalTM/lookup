_Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file._
- [x] Verify that the copilot-instructions.md file in the .github directory is created. (recreated after scaffolding conflict)

- [x] Clarify Project Requirements (Next.js App Router with PlayerDB integration already specified)
	Ask for project type, language, and frameworks if not specified. Skip if already provided.

- [x] Scaffold the Project (npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir)
	Ensure that the previous step has been marked as completed.
	Call project setup tool with projectType parameter.
	Run scaffolding command to create project files and folders.
	Use '.' as the working directory.
	If no appropriate projectType is available, search documentation using available tools.
	Otherwise, create the project structure manually using available file creation tools.

- [x] Customize the Project
	Verify that all previous steps have been completed successfully and you have marked the step as completed.
	Develop a plan to modify codebase according to user requirements.
	Apply modifications using appropriate tools and user-provided references.
	Skip this step for "Hello World" projects.

- [x] Install Required Extensions (none requested)
	ONLY install extensions provided in the get_project_setup_info. Skip otherwise and mark as completed.

- [x] Compile the Project (npm run lint && npm run build)
	Verify that all previous steps have been completed.
	Install any missing dependencies.
	Run diagnostics and resolve any issues.
	Check for markdown files in project folder for relevant instructions on how to do this.

- [x] Create and Run Task (not required for npm scripts)
	Verify that all previous steps have been completed.
	Check https://code.visualstudio.com/docs/debugtest/tasks to determine if the project needs a task. If so, use the create_and_run_task tool to create and launch a task based on package.json, README.md, and project structure.
	Skip this step otherwise.

- [ ] Launch the Project
	Verify that all previous steps have been completed.
	Prompt user for debug mode, launch only if confirmed.

- [x] Ensure Documentation is Complete (README refreshed, instructions cleaned)
	Verify that all previous steps have been completed.
	Ensure README.md and this file both exist and contain current project information.
	Remove any HTML comments from this file.

## Execution Guidelines
**Progress tracking**
- Use any available todo tooling to keep this checklist updated.
- After completing each step, mark it complete and add a short summary.
- Read the current todo status before starting a new step.

**Communication rules**
- Avoid verbose explanations or dumping full command output.
- If a step is skipped, note that briefly (e.g. "No extensions needed").
- Only describe project structure when specifically asked.

**Development rules**
- Use `.` as the working directory unless the user specifies otherwise.
- Avoid adding media or external links unless requested.
- Use placeholders only with a note that they must be replaced.
- Ask for clarification when requirements are ambiguous.
- When working on a VS Code extension, consult the VS Code API tool for reference samples.
- Do not suggest opening the project in Visual Studio—VS Code is already in use.
- Follow any additional rules mentioned in project setup info.

**Folder creation rules**
- Treat the current directory as the project root.
- When running terminal commands, include the `.` argument to anchor to the current workspace.
- Do not create new folders unless the user explicitly asks (aside from `.vscode` for tasks).
- If scaffolding complains about directory names, inform the user so they can rename and reopen the folder.

**Extension installation rules**
- Install only the extensions specified via `get_project_setup_info`.

**Project content rules**
- Default to a "Hello World" starting point when requirements are unspecified.
- Skip links or integrations that were not requested.
- Do not generate media assets unless asked; if placeholders are necessary, state that they must be replaced.
- Ensure new components directly support the requested workflow.

**Task completion rules**
- Work is complete when:
	- The project scaffolds and compiles without errors.
	- `.github/copilot-instructions.md` exists and reflects the current project.
	- `README.md` exists and is up to date.
	- The user has clear instructions for debugging/launching the project.

Update this plan before starting a new task.
- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
