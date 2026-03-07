<script setup lang="ts">
import { Heart, Activity, Brain, CheckCircle, Shield, Microscope, Cloud, FlaskConical, Watch } from 'lucide-vue-next';
const topics = [
  { icon: Heart, title: 'Organ & Tissue Modeling', desc: 'Patient-specific geometry and biophysics.' },
  { icon: Activity, title: 'Multi-Modal Integration', desc: 'Imaging, signals, genomics, sensors.' },
  { icon: Brain, title: 'AI-Driven Simulation', desc: 'Predictive models and surrogate learning.' },
  { icon: CheckCircle, title: 'Clinical Translation', desc: 'Validation, safety, and deployment.' },
  { icon: Shield, title: 'Trustworthy AI', desc: 'Fairness, privacy, and explainability.' },
  { icon: Microscope, title: 'Surgical & Intervention Planning', desc: 'Digital twin-guided therapy.' },
  { icon: Cloud, title: 'Federated & Cloud DTs', desc: 'Scalable, privacy-preserving infrastructure.' },
  { icon: FlaskConical, title: 'In Silico Trials', desc: 'Virtual cohorts and regulatory pathways.' },
  { icon: Watch, title: 'Monitoring & Digital Health', desc: 'Real-time sensing and feedback.' },
];
</script>

<template>
  <section id="topics" class="section-light py-28 px-[8vw] relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1E6EF1]/[0.02] rounded-full blur-[120px]" />
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1E6EF1]/[0.03] rounded-full blur-[100px]" />
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="reveal mb-20">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-8 h-[2px] bg-gradient-to-r from-[#1E6EF1] to-[#60A5FA] rounded-full"></div>
          <div class="font-mono-label text-[#1E6EF1]">Research Scope</div>
        </div>
        <h2 class="font-['Space_Grotesk'] text-[clamp(2.5rem,4.5vw,3.5rem)] font-semibold text-[#0B0C0F] leading-tight">
          Topics
        </h2>
        <p class="text-[#6B7280] mt-4 max-w-2xl text-lg">
          Explore the cutting-edge research areas that define the future of digital twin technology in healthcare.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        <div v-for="(topic, index) in topics" :key="index"
          class="reveal-scale card-light p-7 group cursor-default">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E6EF1]/10 to-[#60A5FA]/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-[#1E6EF1]/20 group-hover:to-[#60A5FA]/10 transition-all duration-500">
            <component :is="topic.icon" class="text-[#1E6EF1] group-hover:text-[#3B82F6] transition-colors duration-300" :size="26" strokeWidth={1.5} />
          </div>
          <h3 class="font-['Space_Grotesk'] font-semibold text-lg text-[#0B0C0F] mb-3 group-hover:text-[#1E6EF1] transition-colors duration-300">
            {{ topic.title }}
          </h3>
          <p class="text-sm text-[#6B7280] leading-relaxed">{{ topic.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
