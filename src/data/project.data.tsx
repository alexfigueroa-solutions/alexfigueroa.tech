import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ProjectBrandingType, getProjectBrandingCopy } from './utils/getProjectBrandingCopy';
import { getProjectUrls } from './utils/getProjectUrls';
import { getProjectTitleFonts } from './utils/getProjectTitleFonts';

export type ProjectKey = 'WorkspaceAutomator' | 'Blitzkrieg' | 'DynamicTaskLine' | 'TraceMate' | 'CodebaseSeed' | 'CodebasedUtils' | 'AlexFigueroaPortfolio';

export type ProjectType = {
    id: string;
    branding: ProjectBrandingType;
    github_url: string;
    title_font: string;// Keep the GitHub URL here
    // Add any other fields you might need
};

export type ProjectData = {
    [key in ProjectKey]: ProjectType;
};

const fetchProjectData = (): ProjectData => {
    const brandingCopy = getProjectBrandingCopy();
    const projectUrls = getProjectUrls();
    const projectTitleFonts = getProjectTitleFonts();

    return Object.keys(brandingCopy).reduce((acc, key) => {
        const projectKey = key as ProjectKey;
        acc[projectKey] = {
            id: uuidv4(),
            branding: brandingCopy[projectKey],
            github_url: projectUrls[projectKey],
            title_font: projectTitleFonts[projectKey]
        };
        return acc;
    }, {} as ProjectData);
};

export const projectsData = fetchProjectData();
