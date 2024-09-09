import { inject, InjectionToken } from "@angular/core"

export interface EnvinormentConfig{
    apiUrl: string
}


const ENVINORMEMENT_CONFIG = new InjectionToken<EnvinormentConfig>('inject token envinorment')

export const injectEnviromentConfig = () => inject(ENVINORMEMENT_CONFIG);

export const provideEnvironmentConfig = (value: EnvinormentConfig) =>( {
    provide: ENVINORMEMENT_CONFIG,
    useValue: value,
})