<script setup lang="ts">
import { Heart, Activity, Brain, CheckCircle, Shield, Microscope, Cloud, FlaskConical, Watch } from 'lucide-vue-next';
const topics = [
  { icon: Heart, title: 'Organ & Tissue Modeling', desc: 'Patient-specific geometry and biophysics.' },
  { icon: Activity, title: 'Multi-modal Integration', desc: 'Imaging, signals, genomics, sensors.' },
  { icon: Brain, title: 'AI-driven Simulation', desc: 'Predictive models and surrogate learning.' },
  { icon: CheckCircle, title: 'Clinical Translation', desc: 'Validation, safety, and deployment.' },
  { icon: Shield, title: 'Trustworthy AI', desc: 'Fairness, privacy, and explainability.' },
  { icon: Microscope, title: 'Surgical & Intervention Planning', desc: 'Digital twin-guided therapy.' },
  { icon: Cloud, title: 'Federated & Cloud DTs', desc: 'Scalable, privacy-preserving infrastructure.' },
  { icon: FlaskConical, title: 'In Silico Trials', desc: 'Virtual cohorts and regulatory pathways.' },
  { icon: Watch, title: 'Monitoring & Digital Health', desc: 'Real-time sensing and feedback.' },
];
</script>

<template>
  <section id="topics" class="section-light py-24 px-[8vw]">
    <div class="max-w-7xl mx-auto">
      <div class="reveal mb-16">
        <div class="font-mono-label text-[#1E6EF1] mb-4">Research Scope</div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#0B0C0F]">
          Announcements Topics
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        <div v-for="topic in topics" key={i}
          class="reveal-scale card-light p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <component :is="topic.icon" class="text-[#1E6EF1] mb-4" :size="28" strokeWidth={1.5}></component>
          <h3 class="font-['Space_Grotesk'] font-semibold text-lg text-[#0B0C0F] mb-2">
            {{ topic.title }}
          </h3>
          <p class="text-sm text-[#6B7280]">{{ topic.desc }}</p>
        </div>

      </div>
    </div>
  </section>
</template>
