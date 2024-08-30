import { inject, InjectionToken } from "@angular/core";

export interface EnvironmentConfig{
    apiUrl: string;
}

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>('environment')

export const injectEnvironmentCofig = () => inject(ENVIRONMENT_CONFIG)

export const provideEnvironmentCofig = (value: EnvironmentConfig) => ({
    provide: ENVIRONMENT_CONFIG,
    useValue: value,
})