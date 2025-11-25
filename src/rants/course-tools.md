---
layout: default.html
title: Nick Petrone | about me
icon: /media/raven-updated-cornerless.svg
---

# Improving course tools

This article is a WIP.

# CSE 120 (Fall)
Unfortunately the code I worked on is held within private repositories. I may eventually be able to publish the student
repository management code publicly since that doesn't contain any secrets, but I can't post changes made to the course
autograder for (hopefully) obvious reasons.

## Problems
1) **Student repository management:** We need to fork around 150-200 repositories for student code and add the students
  as collaborators once they form their groups. Students may change their group throughout the quarter; new repositories must be
  created and the old ones made unavailable to accomodate this. Students may need their invites re-sent if they don't check their email.
2) **Autograder configuration and deployment:** A Gradescope autograder Docker image needs to be built and deployed for each project
  assignment, and must be rebuilt when the project groups change or tests are added to the grader.

## Repository Management
For (1), the existing solution used a Jupyter notebook to send HTTP requests to GitHub's REST API. While it was functional, it
had a number of issues:
<ol style="list-style: lower-alpha">
	<li>Commits could contain GitHub token data if you weren't careful to scrub output cells before committing</li>
	<li>Outdated data were being cached in the kernel, causing you to have to re-run the entire notebook to complete any task</li>
	<li>It encouraged desynchronizing the locally downloaded <code>groups.csv</code> with the ground truth group data within Google Sheets</li>
	<li>Many errors were checked in post instead of validating that an operation would complete without error beforehand</li>
	<li>Code contained magic numbers and hard-coded values that needed to be changed on a class-by-class basis</li>
	<li>Multiple configuration locations</li>
</ol>

I didn't want to deal with any tech debt but my own, so I decided to engineer a new tool from the ground up that solved these issues using TypeScript.
This gave me access to [Octokit](https://www.npmjs.com/package/octokit), which provides a lovely-to-use wrapper for the GitHub REST API. Now I could
interact with the GitHub API in a well-typed way. For the user interface, I decided to use [Commander](https://www.npmjs.com/package/commander)

## Autograder configuration

<div class="horizontally-center">
	<figure>
		<img src="/media/automation.png" width="350">
		<figcaption>it just keeps happening!</figcaption>
	</figure>
</div>

# Systems Programming & Software Tools
I made [Slot Machine](https://github.com/ucsd-cse29/slot-machine), which is a small command line tool for greedily assigning students to
preferred remote exam timeslots. It solved the problem of scheduling 100+ students into a fixed number of capacity-limited time slots such that:
1) Each student gets a slot they prefer (or at least one they can make)
2) Each individual slot has a maximum of `N` students, where `N` is some maximum number of students that can effectively be proctored at once

# Computer Security
There's a [difficult-to-setup assignment](https://cseweb.ucsd.edu/classes/wi25/cse127-a/pa4.html) that happens somewhat late into the quarter that
always trips up TAs. The gist is that there's 4 separate servers, one of which has a user account per student on it, and you need to create "flash drive dumps"
for each student and send an email to them to start their scavenger hunt. There's documentation about the setup in the GitHub repository corresponding to the
assignment, but (a) steps are missing, and (b)
